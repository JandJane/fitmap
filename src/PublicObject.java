import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PublicObject {
    private int id;
    private int owner_id;
    private String description;

    public PublicObject(int owner_id, String description) {
        this.owner_id = owner_id;
        this.description = description;
        DatabaseConnection db = new DatabaseConnection();
        int id = db.insertPublicObject(owner_id, description);
        if (id != -1) {
            this.id = id;
        }
    }

    public int getId() {
        return id;
    }

    public int getOwner_id() {
        return owner_id;
    }

    public String getDescription() {
        return description;
    }
}
