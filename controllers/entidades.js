
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");
const Request = require('tedious').Request;
const {connection} = require("../db/connectmssql");

const getAllEntidades = async (req, res) => {
 

  let request = new Request("exec dbo.florkprueba", function(err, rowCount) {
    if (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msj: err.toString() });
    } else {
      console.log(rowCount + ' rows');
    }
  });

  const entidades = []
  request.on('row', function(columns) {
    entidades.push({
      id : columns[0].value,
      tipo : columns[1].value.substring(0,2),
      numero: columns[1].value.substring(2,columns[1].value.length)
    })
    console.log({c: columns})
    
  });

  request.on('requestCompleted',function(){
    res.status(StatusCodes.OK).json({ entidades: entidades, count: entidades.length });
  })
  connection.execSql(request);

};
module.exports = {
  getAllEntidades
};
