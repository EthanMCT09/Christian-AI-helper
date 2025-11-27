class ExtraApp {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello, World! (ExtraApp)");
        int a = 7;
        int b = 6;
        Calculator calc = new Calculator();
        int sum = calc.add(a, b);
        System.out.printf("The sum of %d and %d is %d\n", a, b, sum);
    }
}


