import java.util.Scanner;

public class LoginView {
    LoginModel loginModel;

    public LoginView() {
        displayLogin();
    }

    public LoginView(LoginModel loginModel) {
        this.loginModel = loginModel;
        displayInfo();
    }
    private void displayLogin() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Nhap username & password");
        System.out.println("Nhap username:");
        String username = sc.nextLine();
        System.out.println("Nhap password:");
        String password = sc.nextLine();
        this.loginModel =  new LoginController().checkLogin(username, password);
        if(this.loginModel != null) {
            this.displayInfo();
        } else {
            System.out.println("Wrong username or password!");
        }
    }
    private void displayInfo() {
        System.out.println("username:");
        System.out.println(loginModel.getUsername());
        System.out.println("------------------");
    }
}
