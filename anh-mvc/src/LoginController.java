public class LoginController {
    private LoginModel loginModel;

    public LoginController() {
    }

    public LoginController(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    public LoginModel checkLogin(String username, String password) {
        if(username.equals("admin") && password.equals("1223")){
            loginModel = new LoginModel(username, password);
        }
        return loginModel;
    }
}
