import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

public class ScientificCalculator {
    public double add(double a, double b) {
        return a + b;
    }

    public double subtract(double a, double b) {
        return a - b;
    }

    public double multiply(double a, double b) {
        return a * b;
    }

    public double divide(double a, double b) {
        return a / b;
    }

    public double power(double a, double b) {
        return Math.pow(a, b);
    }

    public double sqrt(double a) {
        return Math.sqrt(a);
    }

    public long factorial(int n) {
        if (n < 0) throw new IllegalArgumentException("factorial: n must be >= 0");
        long res = 1;
        for (int i = 2; i <= n; i++) res *= i;
        return res;
    }

    public double sin(double radians) { return Math.sin(radians); }
    public double cos(double radians) { return Math.cos(radians); }
    public double tan(double radians) { return Math.tan(radians); }

    public double log10(double a) { return Math.log10(a); }
    public double ln(double a) { return Math.log(a); }

    /**
     * Solve quadratic ax^2 + bx + c = 0. Returns a string describing roots.
     */
    public String solveQuadratic(double a, double b, double c) {
        if (a == 0) {
            if (b == 0) return (c == 0) ? "Infinite solutions" : "No solution";
            return String.format("Linear root: %.6f", -c / b);
        }
        double disc = b*b - 4*a*c;
        if (disc > 0) {
            double r1 = (-b + Math.sqrt(disc)) / (2*a);
            double r2 = (-b - Math.sqrt(disc)) / (2*a);
            return String.format("Two real roots: %.6f and %.6f", r1, r2);
        } else if (disc == 0) {
            double r = -b / (2*a);
            return String.format("One real root: %.6f", r);
        } else {
            double real = -b / (2*a);
            double imag = Math.sqrt(-disc) / (2*a);
            return String.format("Two complex roots: %.6f + %.6fi and %.6f - %.6fi", real, imag, real, imag);
        }
    }

    /**
     * Evaluate a math expression (simple) using the JavaScript ScriptEngine if available.
     * Example: "(2+3)*4 - 5/2"
     */
    public double evaluateExpression(String expr) throws Exception {
        ScriptEngineManager mgr = new ScriptEngineManager();
        ScriptEngine engine = mgr.getEngineByName("JavaScript");
        if (engine == null) throw new UnsupportedOperationException("No script engine available for expression evaluation");
        Object result = engine.eval(expr);
        if (result instanceof Number) return ((Number)result).doubleValue();
        throw new IllegalArgumentException("Expression did not return a numeric result");
    }
}
