const Menu = require('../../models/menu');

function homepageController(){
   return {
       index: async function(req,res){
           const icecreams = await Menu.find();
            return res.render('homepage', {icecreams: icecreams});
       }
   } 
}

module.exports = homepageController;

