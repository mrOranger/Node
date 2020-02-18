function indexServer(express, connection){

    express.get('/index', function(request, response){
        const query = "SELECT * FROM Todo";
        connection.query(query, function(error, rows, fields){
            if(error){
                console.log('Error in Database query');
                console.log(error);
                response.sendStatus(500);
            }else{
                response.render('index', {"elements": rows});
            }
        });
    });

    express.delete('/index', function(request, response){
        const query = `DELETE FROM Todo WHERE Name = "${request.body.name}" AND StartingDate = "${request.body.beginning}" AND EndingDate = "${request.body.ending}"`;
        connection.query(query, function(error, rows, fields){
            if(error){
                console.log('Error in Database query');
                console.log(error);
                response.sendStatus(500);
            }else{
                console.log('Delete the element: ' + request.body.name);
                response.sendStatus(200);
            }
        }); 
    });

    express.put('/index', function(request, response){
        const query = `INSERT INTO Todo(Name, StartingDate, EndingDate, Priority, Description) VALUES ("${request.body.name}", "${request.body.start}", "${request.body.end}", ${request.body.priority}, "${request.body.description}")`;
        connection.query(query, function(error, rows, fields){
            if(error){
                console.log('Error in Database query');
                console.log(error);
                response.sendStatus(500);
            }else{
                console.log('Element recorded!');
                response.sendStatus(200);
            }
        }); 
    });
}

module.exports = indexServer;