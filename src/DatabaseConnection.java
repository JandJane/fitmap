import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.List;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseConnection {
    private Connection connection;

    public DatabaseConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
            this.connection = DriverManager.getConnection(
                "jdbc:mysql://sql7.freemysqlhosting.net:3306",
                "sql7268437",
                "vlXySejveL");
            connection.createStatement().executeQuery("USE sql7268437");
        } catch (Exception ex) {
            System.out.println("Connection failed...");
            System.out.println(ex);
        }
    }

    public Connection getConnection() {
        return connection;
    }

    public int insertPublicObject(int owner_id, String description) {
        String SQL_INSERT = "INSERT INTO publicobjects (`owner_id`, `description`) VALUES (?, ?)";
        try {
            PreparedStatement statement =
                    connection.prepareStatement(SQL_INSERT, PreparedStatement.RETURN_GENERATED_KEYS);
            statement.setInt(1, owner_id);
            statement.setString(2, description);
            statement.executeUpdate();
            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                return generatedKeys.getInt(1);
            }
            else {
                throw new SQLException("Creating user failed, no ID obtained.");
            }
        } catch (Exception ex) {
            System.out.println(ex);
            return -1;
        }
    }

    public List<Integer> getPublicObjectsIds(int user_id) {
        String SQL_SELECT = "SELECT id FROM publicobjects WHERE owner_id = ?";
        try {
            PreparedStatement statement = connection.prepareStatement(SQL_SELECT);
            statement.setInt(1, user_id);
            ResultSet result = statement.executeQuery();
            List<Integer> ids = new ArrayList<>();
            while (result.next()) {
                ids.add(result.getInt("id"));
            }
            return ids;
        } catch (Exception ex) {
            System.out.println(ex);
            return new ArrayList<>();
        }
    }

    //    String query = "SELECT * FROM sql7268437.users";
//    try {
//        Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
//        Connection conn = DriverManager.getConnection(
//                "jdbc:mysql://sql7.freemysqlhosting.net:3306",
//                "sql7268437",
//                "vlXySejveL");
//        // getting Statement object to execute query
//        Statement stmt = conn.createStatement();
//
//        // executing SELECT query
//        ResultSet rs = stmt.executeQuery(query);
//        while (rs.next()) {
//            int count = rs.getInt(1);
//            System.out.println("Total number of books in the table : " + count);
//        }

}
