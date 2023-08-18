const auth = require('../middlewares/auth');
const { validateContact, Contact } = require('../models/Contact');

const router = require('express').Router();

//create a contact
router.post("/contact",async(req,res)=>{
    const{error}=validateContact(req.body);

    if(error){
        return res.status(400).json({error:error.details[0].message})
    }

    const {name, address ,email, phone} = req.body;

    try{
        const newContact = new Contact({
            name,
            address,
            email,
            phone,
            postedBy: req.user._id,
        });
        const result = await newContact.save();

        return res.status(201).json({...result._doc});
    }catch(err){
        console.log(err);
    }
})

//fetch contact
router.get("/mycontacts",auth,async(req,res)=>{
try{
    const myContacts = await Contact.find({postedBy:req.user._id}).populate(
        "postedBy",
        "-password"
    );

    return res.status(200).json({contacts:myContacts.reverse()});
}catch(err){
    console.log(err);
}
});

//update a contact
router.put("/contact",auth,async(req,res)=>{
    const {id} = req.body;

    //If ID not specified
    if(!id) return res.status(400).json({error:"no ID specified."})
    if(!mongoose.isValidObjectId(id)) //check if it's a valid ID or not
        return res.status(400).json({error:"Please enter a valid id"});


    try{
        const contact = await Contact.findOne({ _id: id });
        if(req.user._id.toString()!==contact.postedBy._id.toString())
            return res.status(401).json({error: "You can't edit other people contacts!"});
    
        const updatedData={...req.body,id:undefined}; //To prevent the ID from getting updated, we make it undefined
        const result = await contact.findByIdAndUpdate(id, updatedData, {
            new: true,
          });

        return res.status(200).json({...result._doc});
            
    }catch(err){
        console.log(err);
    }
})

//delete a contact
router.delete("/delete/:id",auth,async(req,res)=>{
    const{id} = req.params;

    if(!id) return res.status(400).json({error:"no id specified."});

    if(!mongoose.isValidObjectId(id))
        return res.status(400).json({error: "Please enter a valid id"});
    
    try{
        const contact = await Contact.findOne({_id:id});
        if(!contact) 
            return res.status(400).json({error:"No Contact found"});
        if(req.user._id.toString() !== contact.postedBy._id.toString())
            return res.status(401).json({error:"You can't delete other people contacts!"});
        
        const result = await Contact.deleteOne({_id:id});
        const myContacts = await Contact.find({postedBy:req.user._id}).populate(
            "postedBy",
            "-password"
            );
            
            return res.status(200).json({...contact._doc,myContacts: myContacts.reverse()});

    }catch(err){
        console.log(err);
    }

});

 //to get a single contact
 router.get("/contact/:id", auth, async (req, res) => {
    const { id } = req.params;
  
    if (!id) return res.status(400).json({ error: "no id specified." });
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "please enter a valid id" });
  
    try {
      const contact = await Contact.findOne({ _id: id });
  
      return res.status(200).json({ ...contact._doc });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
