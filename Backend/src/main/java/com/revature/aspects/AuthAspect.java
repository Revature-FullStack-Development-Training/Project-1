package com.revature.aspects;

import com.revature.controllers.AuthController;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect // This makes a class an Aspect - a class that can trigger functionality
// at any point in our code
@Component
public class AuthAspect {

    // An advice is the functionality that an aspect can trigger

    // An advice that checks if the user is logged in before they can call UserController
    // methods except for the registerUser method - anyone should be able to register

    @Before("execution(* com.revature.controllers.UserController.*(..)) " +
            "&& !execution(* com.revature.controllers.UserController.createUser(..))")
    public void checkLogin() throws IllegalArgumentException {

        if (AuthController.session == null) {
            throw new IllegalArgumentException("You must be logged in to do this!");
        }

        /*
        The Exception will not be handled appropriately... because this is checked before
            any controller method runs
        (thus the handler in the controller won't catch it)

        We could do a global exception handler with @ControllerAdvice
        We'll handle errors on the frontend in the exact same way. So no biggie.
        */
    }

    // Note: we could have also done "com.revature.controllers.*.*(..)" to apply
    // checkLogin() to all controller methods

    // An advice that checks for admin privileges before calling methods with @AdminOnly
    @Before("@annotation(com.revature.aspects.ManagerOnly)")
    public void checkAdmin() {
        // If the logged in user does not have a role equal to "admin", throw an exception
        if (!AuthController.session.getAttribute("title").equals("Manager")) {
            throw new IllegalArgumentException("You must be an admin to do this!");
        }
    }
}
