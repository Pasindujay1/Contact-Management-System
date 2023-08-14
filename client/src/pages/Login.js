const Login = () =>{
    return <>
    <h3>Login</h3>

    <form>
        <div class="form-group">
        <label for="emailInput" class="form-label mt-4">Email address</label>
        <input type="email" class="form-control" id="emailInput" name="email" aria-describedby="emailHelp" placeholder="simon@example.com"/>
        </div>
        <div class="form-group">
        <label for="password" class="form-label mt-4">Password</label>
        <input type="password" class="form-control" id="password" name="email"  placeholder="Enter password"/>
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
    </form>
    </>
}

export default Login;