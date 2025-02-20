const express = require('express')
const Emoji = require('./Model/UserSchema')
const router = express.Router();


router.post('/emoji',async(req,res)=>{
    const {symbol,name} = req.body;

    console.log(symbol);
    if(!symbol||!name){
        return res.status(400).json({error:"Both symbol and name required"})

    }
    try{
        await Emoji.create({
            symbol,
            name,
            usageCount: 0,  // Starting with 0 usage count
            overused: false
        })
        res.status(200).json({
            message:"Emoji created successfully!"
        })

        }catch{
           
                res.status(500).json({ error: 'Failed to create emoji: ' + err.message });
              

        }
        },
)
router.get('/emojis', async (req, res) => {
    try {
      const emojis = await Emoji.find(); // Get all emojis
      res.status(200).json(emojis);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch emojis: ' + err.message });
    }
  });

router.put('/emoji/:symbol', async (req, res) => {
    try {
      // Find the emoji by symbol
      const emoji = await Emoji.findOne({ symbol: req.params.symbol });
  
      if (!emoji) {
        return res.status(404).json({ message: 'Emoji not found' });
      }
  
      // Increment usage count
      emoji.usageCount += 1;
  
      // Save the updated emoji
      await emoji.save();
  
      res.status(200).json({
        message: 'Emoji usage count updated!',
        emoji
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update emoji: ' + err.message });
    }
  });
  router.delete('/emoji/:symbol', async (req, res) => {
    try {
      const emoji = await Emoji.findOneAndDelete({ symbol: req.params.symbol });
  
      if (!emoji) {
        return res.status(404).json({ message: 'Emoji not found' });
      }
  
      res.status(204).send(); // No content, successful deletion
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete emoji: ' + err.message });
    }
  });
  
  module.exports = router;