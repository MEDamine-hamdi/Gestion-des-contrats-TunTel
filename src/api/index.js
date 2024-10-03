const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db'); 
const User = require('./models/user');
const B2B = require('./models/b2b');
const EspaceTT = require('./models/espacett'); 
const MainTT = require('./models/MainTT');
const MainB2B = require('./models/Mainb2b');
const Offre = require('./models/Offres.jsx');
const Chiffre = require('./models/ChiffreA.js');
const CC=require('./models/cc.js');
const File = require('./models/file'); // Require the File model
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


app.post('/upload-pdf', (req, res) => {
    const userProfile = req.body.userProfile ? JSON.parse(req.body.userProfile) : null;

    if (!req.headers['content-type'].startsWith('multipart/form-data')) {
        return res.status(400).send('Please use multipart/form-data format.');
    }

    const file = req.files?.pdfFile; // Assuming you're using middleware to handle file uploads

    if (!file || !userProfile) {
        return res.status(400).send('File or user profile data is missing.');
    }

    // Create a unique file name and save the file to the server
    const filePath = path.join(__dirname, 'uploads', file.name);

    file.mv(filePath, async (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).send('Failed to save the file.');
        }

        console.log('File saved:', filePath);
        console.log('User profile:', userProfile);

        // Save the file information and user profile to MongoDB
        const newFile = new File({
            name: file.name,
            path: filePath,
            userProfile: userProfile.profile, // Adjust this to save the specific profile information
        });

        try {
            await newFile.save();
            console.log('File information saved to database');
            res.status(200).send('File and profile information received and saved.');
        } catch (dbErr) {
            console.error('Error saving file to database:', dbErr);
            res.status(500).send('Failed to save file to the database.');
        }
    });
});
app.get('/files/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'uploads', fileName);

    if (fs.existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Failed to download the file.');
            }
        });
    } else {
        res.status(404).send('File not found.');
    }
});

app.get('/files/view/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'uploads', fileName);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Failed to serve the file.');
            }
        });
    } else {
        res.status(404).send('File not found.');
    }
});

// Endpoint to fetch all saved files
app.get('/files', async (req, res) => {
    try {
      const files = await File.find(); // Make sure 'File' is correctly imported from your model file
      res.json(files);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const dataSchema = new mongoose.Schema({
    profile: String,
    objet: Date,
    montant: Number,
});
const DataModel = mongoose.model('Data', dataSchema);

const calculateMonthsDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
};

// Endpoint to fetch contracts expiring within one month
app.get('/contracts-expiring-soon', async (req, res) => {
    try {
        const currentDate = new Date();
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

        const ttContracts = await MainTT.find(); // Fetch contracts from MainTT
        const b2bContracts = await MainB2B.find(); // Fetch contracts from MainB2B

        const expiringContracts = [];

        ttContracts.forEach(contract => {
            const monthsDifference = calculateMonthsDifference(contract.objet, currentDate);
            console.log(`TT Contract ID: ${contract._id}, Months Difference: ${monthsDifference}, Contract Duration: ${contract.duree}`);
            
            if (monthsDifference >= contract.duree - 1) {
                expiringContracts.push(contract);
            }
        });

        b2bContracts.forEach(contract => {
            const monthsDifference = calculateMonthsDifference(contract.objet, currentDate);
            console.log(`B2B Contract ID: ${contract._id}, Months Difference: ${monthsDifference}, Contract Duration: ${contract.duree}`);
            
            if (monthsDifference >= contract.duree - 1) {
                expiringContracts.push(contract);
            }
        });

        res.json(expiringContracts); // Return the filtered contracts
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contracts' }); // Handle errors
    }
});


app.get('/highest-sum-this-month', async (req, res) => {
    try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // Filter to get contracts for the current month
        const filter = {
            $and: [
                { montant: { $exists: true, $ne: null } },
                { duree: { $gte: 1 } },
                { objet: { $gte: startOfMonth, $lt: endOfMonth } }
            ]
        };

        // Fetch contracts from both collections
        const [ttContracts, b2bContracts] = await Promise.all([
            MainTT.find(filter),
            MainB2B.find(filter)
        ]);

        console.log('Fetched TT Contracts:', ttContracts);  // Debugging
        console.log('Fetched B2B Contracts:', b2bContracts);  // Debugging

        // Helper function to find the highest sum and user
        const getHighestSum = (contracts) => {
            const sumByUser = {};
            let highestSum = 0;
            let highestUser = 'N/A';

            contracts.forEach(contract => {
                const montant = parseFloat(contract.montant); // Ensure montant is parsed as a number
                const user = contract.user || 'N/A';

                if (!sumByUser[user]) sumByUser[user] = 0;
                sumByUser[user] += montant;

                if (sumByUser[user] > highestSum) {
                    highestSum = sumByUser[user];
                    highestUser = user;
                }
            });

            return { totalMontant: highestSum, user: highestUser };
        };

        // Get the highest sums for both contract types
        const highestB2B = getHighestSum(b2bContracts);
        const highestEspace = getHighestSum(ttContracts);

        console.log('Highest B2B:', highestB2B);  // Debugging
        console.log('Highest Espace:', highestEspace);  // Debugging

        res.json({ highestB2B, highestEspace });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get('/mainTT', async (req, res) => {
    const maintt = await MainTT.find();
    res.json(maintt);
});

app.get('/mainB2B', async (req, res) => {
    const mainb2b = await MainB2B.find();
    res.json(mainb2b);
});

app.get('/api/user', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/user', async (req, res) => {
    const { username, email, password, isAdmin, profile } = req.body;

    const newUser = new User({
        username,
        email,
        password,
        isAdmin,
        profile,
    });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error saving user:', err.message);
        res.status(400).json({ message: err.message });
    }
});




app.post("/tt", async (req, res) => {
    try {
        let espacett_tmp = new EspaceTT(req.body);
        let result = await espacett_tmp.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/b2b", async (req, res) => {
    try {
        let b2b_tmp = new B2B(req.body);
        let result = await b2b_tmp.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/contrat-tt", async (req, res) => {
    const espacett_tmp = await EspaceTT.find();
    res.json(espacett_tmp);
});

app.get("/contrat-b2b", async (req, res) => {
    const b2b_tmp = await B2B.find();
    res.json(b2b_tmp);
});

app.post("/save-contrat-tt", async (req, res) => {
    try {
        let mainContract = new MainTT(req.body); 
        let result = await mainContract.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/delete-contrat-tt/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await EspaceTT.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get('/b2b/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await MainB2B.findOne({ id }); 
        const exists = !!result;
        res.json({ exists });
    } catch (error) {
        console.error('Error checking ID:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/tt/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await MainTT.findOne({ id }); 
        const exists = !!result;
        res.json({ exists });
    } catch (error) {
        console.error('Error checking ID:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post("/save-contrat-b2b", async (req, res) => {
    try {
        let mainContract = new MainB2B(req.body);
        let result = await mainContract.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/delete-contrat-b2b/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await B2B.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post("/offre", async (req, res) => {
    try {
        let newOffre = new Offre(req.body);
        let result = await newOffre.save();
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving offer:', error.message);
        res.status(400).json({ message: error.message });
    }
});

app.post('/cc',async(req,res)=>{
    let newCC =new CC(req.body);
    let result = await newCC.save();
    res.status(201).json(result);
})
app.get('/latest-cc', async (req, res) => {
    try {
        const latestCC = await CC.findOne().sort({ _id: -1 }).exec();
        if (!latestCC) {
            return res.status(404).send({ message: 'No CC records found' });
        }
        res.json({ latestCC: latestCC.cc }); // Adjust the field name as necessary
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch latest CC', error: error.message });
    }
});
app.get("/offre", async (req, res) => {
    const Offres = await Offre.find();
    res.json(Offres);
});
app.post('/chiffreA', async (req, res) => {
    try {
      const { objet, user, chiffre } = req.body;
  
      // Log the data for debugging
      console.log('Received data:', { objet, user, chiffre });
  
      // Create a new Chiffre document
      const newChiffre = new Chiffre({
        objet,
        user,
        chiffre,
      });
  
      // Save the document in MongoDB
      const savedChiffre = await newChiffre.save();
  
      // Send back the saved document
      res.status(200).json(savedChiffre);
    } catch (error) {
      console.error('Error saving chiffre:', error);
      res.status(500).json({ message: 'Failed to save chiffre' });
    }});
app.get("/chifre", async (req, res) => {
    const { profile, objet } = req.query;

    try {
        let filter = {};
        if (profile) {
            filter.profile = profile;
        }

        if (objet) {
            const startOfMonth = new Date(objet);
            startOfMonth.setUTCDate(1);
            startOfMonth.setUTCHours(0, 0, 0, 0);

            const endOfMonth = new Date(startOfMonth);
            endOfMonth.setUTCMonth(endOfMonth.getUTCMonth() + 1);

            filter.objet = { $gte: startOfMonth, $lt: endOfMonth };
        }

        const profiles = await Profile.find(filter);

        const totalMontant = profiles.reduce((sum, profile) => sum + profile.montant, 0);

        res.json({ profiles, totalMontant });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

app.delete('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(200).send({ message: 'User deleted successfully' });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});



app.get('/chiffreA', async (req, res) => {
    const chiffre_affaire = await Chiffre.find();
    res.json(chiffre_affaire);
});

const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
