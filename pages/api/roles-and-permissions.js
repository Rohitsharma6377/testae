// import RolesModel from "@/config/Models/RolesModel";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            const months = ["Jan ", "Feb ", "Mar ", "Apr ", "May", "Jun", "Jul", "Aug ", "Sep", "Oct", "Nov", "Dec"];
            const date = new Date();
            const time = date.getDate() + "th " + months[date.getMonth()];
            const { name, type, guardname } = req.body;
            const data = ({ name, type, time, guardname });
            data.save();
            res.status(200).json({ message: "Successfully Register" });
        } catch (error) {
            // console.log('Error while inserting roles and permissions', error.message)
        }
    }
    else if (req.method === 'GET') {
        try {
            const data = await RolesModel.find({})
            res.status(200).send(data)
        } catch (error) {
            // console.log('Error while getting Roles and Permissions ', error.message);
            res.status(400).send({ message: error.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const { name, type, guardname, id } = req.body;
            const data = await RolesModel.updateOne( {_id:id} , {$set:{name , type , guardname}} )
            res.status(200).send({message:data})
        } catch (error) {
            // console.log('Error while Updating Roles and Permissions ', error.message);
            res.status(400).send({ message: error.message });
        }
    }

}