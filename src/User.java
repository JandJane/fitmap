import java.util.List;

public class User {
    private int id;
    private String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Integer> getPublicObjects() {
        DatabaseConnection db = new DatabaseConnection();
        return db.getPublicObjectsIds(id);
    }

//    public PublicObject[] getPublicObjects() {
//        return ;
//    }
}

