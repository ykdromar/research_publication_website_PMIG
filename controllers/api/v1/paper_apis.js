
const fetchPaper = async (req,res)=>{
 const {
  params:{id:paperId}
 } = req

 const paper = await Paper.findOne({
  _id:paperId,
 })

 if(!paper){
  return res.status(200).json({
   statusCode:401,
   success:false,
   data:{},
   message:"Invalid Paper Id"
  })
 }

 return res.status(200).json({
   statusCode: 200,
   success: true,
   data: {paper},
   message: 'Paper Fetched Successfully',
 })
}

module.exports = {fetchPaper}