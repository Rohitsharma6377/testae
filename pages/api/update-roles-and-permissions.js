
// import RolesModel from "@/config/Models/RolesModel";

export default async function handle(req, res) {
    if (req.method === 'POST') {
        try {
            const { id } = req.body;
            const data = await RolesModel.findOne({ _id: id })
            res.status(200).send( data )

        } catch (error) {
            // console.log('Error while getting updating Roles and Permissions data ', error.message);
            res.status(400).send({ message: error.message });
        }
    }
}