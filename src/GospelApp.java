import java.util.Scanner;

public class GospelApp {
    public static void main(String[] args) {
        GospelAssistant assistant = new GospelAssistant();
        Scanner sc = new Scanner(System.in);

        System.out.println("Gospel Assistant — type your message and press Enter. Type 'exit' to quit.");
        while (true) {
            System.out.print("You: ");
            if (!sc.hasNextLine()) break;
            String line = sc.nextLine().trim();
            if (line.equalsIgnoreCase("exit") || line.equalsIgnoreCase("quit")) {
                System.out.println("Assistant: I'm praying for you. Take care — goodbye.");
                break;
            }
            if (line.isEmpty()) {
                System.out.println("Assistant: I'm here whenever you're ready to share.");
                continue;
            }

            String response = assistant.respond(line);
            System.out.println("Assistant: " + response);
            System.out.println();
        }

        sc.close();
    }
}
