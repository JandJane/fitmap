public class Endpoints {
    public static void main(String[] args) {
//        PublicObject pub = new PublicObject(1, "Local паб");
        User tanya = new User(1, "Tanya");
        for (int id : tanya.getPublicObjects()) {
            System.out.println(id);
        }
//        System.out.println(pub.getId());
    }
}
