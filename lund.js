const routes = {};
function get(path, finder){
    routes[path] = finder
}
function login(){
    console.log("Welcome to Instagram")
}
get("/login",login);
new request_path= "/login";
routes[request_path] = finder;

finder();