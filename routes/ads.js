const Add = require("./../models/Add")

const router = require("express").Router();


//CREATE ADD

router.post("/",async (req,res) => {
    const NewAdd = new Add(req.body)
    try {
        const savedAdd = await NewAdd.save();
        res.status(200).json(savedAdd)
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all adds

router.get("/all", async (req,res) => {
   try {
        const allAds = await Add.find();
        res.status(200).json(allAds)
   } catch (error) {
       res.status(500).json(error)
   }
})

//get single add

router.get("/:id", async (req, res) => {
	try {
		const add = await Add.findById(req.params.id);
		res.status(200).json(add);
	} catch (error) {
		res.status(500).json(error);
	}
});
module.exports = router;