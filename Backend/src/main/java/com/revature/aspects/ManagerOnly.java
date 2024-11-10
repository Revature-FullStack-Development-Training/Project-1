package com.revature.aspects;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// This is a custom annotation!
// We can use it to annotate any controller method that can only be accessed by admins

@Target(ElementType.METHOD) // This annotation can only be applied to methods
@Retention(RetentionPolicy.RUNTIME) // The annotation will be available at runtime
public @interface ManagerOnly {

    // No need for any fields/methods

    // Our AuthAspect will check for this annotation before allowing HTTP requests
}