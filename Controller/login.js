function loginServer(express, connection){

    /* Serving the route /login rendering to the ejs page */
    express.get('/', function(request, response){
        response.render('login');
    });

    /* Serving the route /login querying the Database */
    express.post('/', function(request, response){
        const query = `SELECT * FROM Users WHERE Username = "${request.body.username}"`;
        connection.query(query, function(error, rows, field){
            if(error){
                console.log('Error in Database query');
                console.log(error);
                response.sendStatus(500);
            }else{
                if(rows.length == 0){
                    /* No user with this name is registered */
                    response.sendStatus(401);
                }else{
                    /* Check the password */
                    if(rows[0].Password.toString() == request.body.password.toString()){
                        response.sendStatus(200);
                    }else{
                        /* The password is not correct */
                        response.sendStatus(401);
                    }
                }
            }
        });
    });

}

module.exports = loginServer;