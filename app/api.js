
module.exports = function(app, router) {


    // ROUTES FOR OUR API
    // =============================================================================


    // middleware to use for all requests
    router.use(function (req, res, next) {
        //do logging
        console.log('Something is happening...');
        next(); //make sure we go to the next routes and don't stop here
    });


    // Test to see if we can get data from server
    // -------------------------------------------------
    router.get('/', function (req, res) {
        res.send('hello world');
        //res.json({message: 'hello world'});
    });

    // On routes that end in /users
    // -------------------------------------------------
    router.route('/users')
        // create a user (accessed at http://host:port/api/users)
        .post(function (req, res) {

            var user = new User();      // create a new Instance of the User model
            user.name = req.body.name;  // set the user name (comes from the request)

            // save the user and check for errors
            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'User created!'})
            })
        })
        // get all users (accessed at http://host:port/api/users)
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err)
                    res.send(err);

                res.send(users);
            })
        });

    // On routes that end in /users/:user_id
    // -------------------------------------------------
    router.route('/users/:user_id')

        // get user with that id (accessed at http://host:port/api/users/:user_id)
        .get(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err)
                    res.send(err);
                res.json(user);

            })
        })

        // update the user with that id (accessed at http://host:port/api/users/:user_id)
        .put(function (req, res) {

            // use our User model to fine the Bear we want
            User.findById(req.params.user_id, function (err, user) {

                if (err)
                    res.send(err);

                user.name = req.body.name;  //update the users info

                //save the user
                user.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'User updated!'})
                })
            })
        })

        // delete the user with that id (accessed at http://host:port/api/users/:user_id)
        .delete(function (req, res) {
            User.remove({
                _id: req.params.user_id
            }, function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Successfully deleted!'})
            })
        });


}