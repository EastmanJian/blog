---
layout: post
title: "Object-Oriented Concepts and Design Principles"
date: 2017-05-21 12:02:00 +08:00
categories: IT Java
tags: java design oo oop ooa ooad
---

* content
{:toc}

## Concepts

### Encapsulation
**Encapsulation** refers to the combining of fields and methods together in a class such that the methods operate on the data, as opposed to users of the class accessing the fields directly.
* Hiding the Nonessential Details, provide sw/apps protection
* The binding of data and functions together into a single class is refrerred as data encapsulation
* It is a mechanism of information hiding.
* An encapsulated class allows a programer to change an implementation without affecting outside code.

### Coupling
**Coupling** is the extent to which one object depends on another object to achieve its goal.
* It is the OO principle most closely associated with making sure classes know about other classes only through their APIs.

### Cohesion
**Cohesion** refers to how closely related the specific tasks are of an object
* It is the OO principle most closely associated with making sure a class is designed with a single, well-focused purpose.





### OO Design Relationships

#### The "is-a" Relationship
The **"is-a" relationship**, a simple test to determine if you are using a proper approach and good code design in your application regarding inheritance. 
* You should be able to state that your child object “is a” parent object.
* Inheritance is the process by which objects of one class acquire the properties of the objects of another class.
* Inheritance arranges the classes in a strict hierarchy, provide reusability and extensibility in classes, new class has its own attributes and the parents attributes. 
* Inheritance is a mechanism of information hiding.
* The "is-a" relationship is not unique to Java. Inheritance in any OO programming language should satisfy the is-a relationship. 

##### e.g. good design example of "is-a" Relationship (Inheritance)

![a cat is a pet](http://eastmanjian.cn/blog/resources/img/java/cat-pet.png)

![an employee is a person](http://eastmanjian.cn/blog/resources/img/java/employee-person.png)

##### e.g. bad design example of "is-a" Relationship (Inheritance)

![an employee is not a pet](http://eastmanjian.cn/blog/resources/img/java/employee-pet.png)


#### The "has-a" Relationship
The **"has-a" relationship** is a test to decide when a class should use composition. **Composition** refers to a class that contains a reference to another class. 

##### e.g. good design example of "has-a" Relationship (Composition)
![an employee has a home address](http://eastmanjian.cn/blog/resources/img/java/employee-address.png)

#### Benefits of adhering to these relationships
* The resulting code is more logical.
* The code is easier to understand.
* The classes are easier to reuse in other relationships and applications.
* The code is easier to maintain, especially if the needs and requirements of the program change.

### Polymorphism
**Polymorphism** refers to how an object in Java can take on “many forms.”
* Same stimulus sent to different objects results in different behavior. provides flexibility
* Polymorphism allows a reference to denote objects of different types at different times during execution
* It allows the objects having different internal structure to share same external interface
* It enables us to "program in the general" rather than "program in the specific".
* In Java,  the concept of polymorphism is a result of inheritance and implementing interfaces:
    * A child class takes on the form of its parent class. (子类呈现父类的形态)
    * A class takes on the form of its implemented interfaces. (类呈现其接口的形态)
* All methods in Java are **virtual methods**, meaning that if a method is overridden, the overridden method is always invoked at runtime, even if the compiler sees the parent class method at compile time. 
* **Casting Polymorphic References**: the only time casting is necessary is when you need to invoke a method defined in a child class using a parent class or interface reference and the method is not overridden (from super class). Be careful when casting because it is possible to fool the compiler with a cast that fails at runtime with **ClassCastException**. Use the **instanceof** operator to avoid this case.
* **Polymorphic parameters** of a method:  If a method parameter is a class type, the argument passed in can be any child type of the class as well. Use the instanceof operator if we need to cast the reference to its appropriate child class type to operate. The situation, which Object is used as a Parameter, is quite common in the Java API. e.g. public final void writeObject(Object obj)
* A **heterogeneous collection** is a collection of objects that are not the same data type but have a common parent class. This type of collection is made possible because of polymorphism.

#### e.g. Polymorphism, Casting Polymorphic References
```java
/**
  Example of polymorphism.
  
  Pet class to represent the parent class of various types of pets
 */
public class Pet {
    private String name;
    private int age;
    public Pet(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public void eat() {
        System.out.println(name + " is eating");
    }
}
 
/**
  Mammal class to represent the behaviors of mammals
 */
public interface Mammal {
    public void breathe();
}
 
/**
  Cat  extends Pet, a Cat object is a Pet object. Because Cat implements Mammal, a Cat object is  also a Mammal object.
 
 */
public class Cat extends Pet implements Mammal {
    public Cat(String name, int age) {
        super(name, age);
    }

    public void breathe() {
        System.out.println("Cat is breathing");
    }

    public void sleep() {
        System.out.println("Cat is sleeping");
    }

    public static void main(String[] args) {
        /*
        The reference p can only refer to Pet objects, but because a Cat object is a Pet object, assigning p to c is valid. Similarly, the reference m can only refer to Mammal objects, but because a Cat object is a Mammal, assigning m to c is also valid. There is only one Cat object in memory, but the object is taking on three different forms. The c reference is treating the object as a Cat, the p reference is treating the object as a Pet, and the m  reference is treating the object as a Mammal.
        */
        Cat c = new Cat("Garfield", 3);
        Pet p = c;
        Mammal m = c;

        /*
        The following statements are valid without requiring any casting:
        Using the reference c, you can invoke all the methods of Cat, Pet, and Mammal. Using the reference p, you can only invoke the eat method of Pet. Even though the corresponding Cat object contains sleep and breathe methods, the p reference does not see those methods because the p reference thinks it is pointing to a Pet object (not a Cat). Similarly, using the m reference, you can only invoke the breathe method, even though the object has an eat and a sleep method. Casting is required if you want to invoke the “hidden” methods of the Cat object using the m and p references. 
        */
        c.sleep();
        c.breathe();
        c.eat();
        p.eat();
        m.breathe();

        System.out.println();
        /*
        Casting Polymorphic References:
        In general, the only time casting is necessary is when you need to invoke a method defined in a child class using a parent class or interface reference and the method is not overridden.
        The Cat class contains a sleep method that does not override any methods in Pet or Mammal. To invoke sleep using a Pet reference, you need to cast the reference first.
        The pet reference is of type Pet, so invoking eat using pet reference does not require a cast. However, invoking sleep requires pet to be cast to Cat. Invoking breathe requires pet to be cast to either Mammal or Cat.
        */
        Pet pet = new Cat("Alley", 7);
        pet.eat(); //no cast needed
        ((Cat) pet).sleep(); //cast is needed
        ((Mammal) pet).breathe(); //cast is needed
        ((Cat) pet).breathe(); //Same as previous line of code

    }
}
```

![Pet Mammal Cat](http://eastmanjian.cn/blog/resources/img/java/pet-mammal-cat.png)

```
// console output -> 
Cat is sleeping
Cat is breathing
Garfield is eating
Garfield is eating
Cat is breathing

Alley is eating
Cat is sleeping
Cat is breathing
Cat is breathing
```
		
#### e.g. Virtual Method Invocation
```java
/**
  All methods in Java are virtual methods, meaning that if a method is overridden, the overridden method is always invoked at runtime, even if the compiler sees the parent class method at compile time.
 */
public class ButtonListener {
    public void buttonClicked() {
        System.out.println("Inside ButtonListener");
    }
}
 
/**
  The following ChildListener class extends ButtonListener and overrides the buttonClicked method.
 */
public class ChildListener extends ButtonListener {
    public void buttonClicked() {
        System.out.println("Inside ChildListener");
    }

    public static void main(String[] args) {
        /*
        Using polymorphism, the following statements are valid.
        The listener reference is of type ButtonListener, but it points to a ChildListener object.
        The compiler looks for a buttonClicked method in ButtonListener and finds one, so the code compiles file.
        However, at runtime, the buttonClicked method in ChildListener is invoked.
         */
        ButtonListener listener = new ChildListener();
        listener.buttonClicked();
    }
}
```
```
// console output ->
Inside ChildListener 
```

#### e.g. ClassCastException, Using instanceof operator to avoid ClassCastExcepion
```java
/**
  It is possible to fool the compiler with a cast that fails at runtime.
  (using the Pet class in the above example)
 */
public class Dog extends Pet {
    public Dog(String name, int age) {
        super(name, age);
    }
    public void eat() {
        System.out.println("Dog is eating");
    }

    public static void main(String[] args) {
        Pet one = new Dog("Fido", 2);
        one.eat();
        ((Dog) one).eat();
        /*
        The following line compiles because the Cat class inherits an eat method from Pet, so invoking eat on a Cat is normally a valid statement and the code compiles fine. However, the one reference does not point to a Cat object, and the JVM throws an exception at runtime.
         */
        ((Cat) one).eat(); //runtime exception: java.lang.ClassCastException: Dog cannot be cast to Cat
    }
}
 
/**
   Using the instanceof operator to determine the runtime type of the reference mypet.
   If mypet points to a Cat, we cast it to a Cat before invoking eat. If mypet points to a Dog, we cast it to a 
   Dog before invoking eat. The previous statements compile and run successfully without a ClassCastException 
   ever occurring.
 */
public class InstanceOfTest {
    public static void main(String[] args) {
        Pet mypet = new Dog("Fido", 2);
        if (mypet instanceof Cat) {
            ((Cat) mypet).eat();
        } else if (mypet instanceof Dog) {
            ((Dog) mypet).eat();
        }
    }
}
```
```
// -> Dog is eating
```

#### e.g. polymorphic parameters
```java
/**
  Example of polymorphic parameters:
  If a method parameter is a class type, the argument passed in can be any child type of the class as well.
  The following Vet class contains a vaccinate method that takes in a Pet reference.
  The argument passed into vaccinate can certainly be a Pet object, but you can also pass in a Cat object, a
  Dog object, or any other object that is a child class of Pet.
  Use the instanceof operator if we need to cast the reference to its appropriate child class type.
 */
public class Vet {
    public void vaccinate(Pet pet) {
        if(pet instanceof Dog) {
            System.out.println("Vaccinating a dog");
            Dog dog = (Dog) pet;
            //use the dog reference
        } else if(pet instanceof Cat) {
            System.out.println("Vaccinating a cat");
            Cat cat = (Cat) pet;
            //use the cat reference
        }
    }
}
```

#### e.g.  heterogeneous collection 
```java
import java.util.ArrayList;

/**
  A heterogeneous collection is a collection of objects that are not the same data type but have a common parent class.
  This type of collection is made possible because of polymorphism.
 */
public class HeterogeneousCollections {
    public static void main(String[] args) {
        ArrayList<Pet> pets = new ArrayList<Pet>();
        pets.add(new Pet("", 4));
        pets.add(new Cat("Alley", 7));
        pets.add(new Dog("Fido", 2));
    }
}
```

### Abstraction
**Abstraction** provides access to a specific part of data, focuses on the Essential Characteristics of an Object.
* An abstraction denotes the essential preperties and behaviors of an object the differentiate it from other objects
* It refers to represent the essential features without including the background details or explanation.
* Show only the necessary details to the client of the object


## OO Design Principles
Tight Encapsulation, Loose Coupling, and High Cohesion in classes

### Tight Encapsulation
The term **tight encapsulation** refers to using encapsulation every time on all the fields of a class, and only providing access to the fields via methods. 
* No fields of an object can be modified or accessed directly; 
* You can only access the fields through a method call
* To implement tight encapsulation, make the fields of a class private and provide public accessor (“getter”) and mutator (“setter”) methods
* benefits:
	* You can monitor and validate all changes to a field.
	* You can monitor and format all access to a field.
	* Allowing you to change the data type without affecting the code that uses the object
	* Information hiding, where the user of an object is unaware of how the object stores its data. 

#### e.g. tight encapsulation
```java
/**
 * Bad example of encapsulation
 */
public class Student1 {
    public String year;
    public double grade;

    public static void main(String[] args) {
        Student1 s = new Student1();
        s.year = "Memphis, TN";  //The string “ Memphis, TN ” is not a valid year, 
        s.grade = -24.5; //a student’s grade should never be negative. With tight encapsulation, these issues can easily be avoided.
    }
}
```

```java
/**
  Good example of tight encapsulation
  Users of the class cannot access its fields directly. By forcing a method call to change a value, you can format, convert, or validate the fields of the object.
 */
public class Student2 {
    private String year;  //fields are declared as private
    private float grade;
    public void setYear(String year) {
        if(!year.equals("Freshman") &&  //validation for the field
        !year.equals("Sophomore") &&
        !year.equals("Junior") &&
        !year.equals("Senior")) {
            throw new IllegalArgumentException(
                    year + " not a valid year");
        } else {
            this.year = year;
        }
    }
    public String getYear() {
        return year;
    }
    public void setGrade(double grade) {
        if(grade < 0.0 || grade > 105.0) { //validation for the field
            throw new IllegalArgumentException(grade + " is out of range");
        } else {
            this.grade = (float) grade; //data type change
        }
    }
    public double getGrade() {
        return grade;
    }
    
    public static void main(String[] args) {
        Student2 s2 = new Student2();
        s2.setYear("Junior");
        s2.setGrade(-24.5);
    }
}
```
 
### Loose Coupling
The goal of good OO design is to implement **loose coupling**, where you minimize the dependencies an object has on other objects.
* If objects are tightly coupled, changing the code in one class has a major effect on the dependent class, requiring code changes to both classes.
* The ripple effect of tight coupling can quickly get out of hand, and it can become tedious and difficult to maintain the code.
* Implementing loose coupling actually works in close association with tight encapsulation.
* Unnecessary coupling decreases the reusability of the coupled objects and increases the difficulty of modifying your code.

#### e.g. coupling
```java
/**
 * Bad example of coupling - tight coupling
 */
public class Address {
    public String street;
    public String city;
    public int zip;
}

/**
  Bad example of coupling - tight coupling
  Employee class is tightly coupled to Address because Employee makes multiple accesses to the Address class, directly accessing the street, city, and zip fields of Address.
  Making changes to Address has a direct effect on Employee. For example, if we need to change the city field in Address from a String to a StringBuffer, the Employee class no longer compiles.
 */
public class Employee {
    private Address home;
    public Employee(String street, String city, int zip) {
        home = new Address();
        home.street = street;
        home.city = city;
        home.zip = zip;
    }
}
```

```java
/**
  Good example of loose coupling
 
  If the city field of Address is changed from a String to a StringBuffer, no changes need to be made to the Employee2 class as long as the signature of setCity is unchanged.
 
  One other design technique for achieving loose coupling involves minimizing the interaction between two objects.
  A better, loosely coupled design is to perform the initialization steps in one method call. Like the constructor Address2(String s, String c, int z) below.
 */
public class Address2 {
    private String street;
    private String city;
    private int zip;

    public void setStreet(String s) {
        street = s;
    }

    public Address2(String s, String c, int z) {
        street = s;
        city = c;
        zip = z;
    }

    public void setCity(String c) {
        city = c;
    }

    public void setZip(int z) {
        zip = z;
    }
}
 
public class Employee3 {
    private Address2 home;
    public Employee3(String street, String city, int zip) {
        home = new Address2(street, city, zip);
    }
}
```

### High Cohesion
**High cohesion** is when an object performs a collection of closely related tasks. 
* Low cohesion is when an object performs multiple tasks that are not related to each other.
* High cohesion is an important design goal of any OO application. 
* Classes that implement high cohesion are more reusable and easier to maintain, test and understand.
* Implementing high cohesion works in close association with loose coupling.  If a class performs various unrelated tasks and therefore has low cohesion, more objects will need to communicate with the class, which results in tighter coupling. 

#### e.g. cohesion
```java
/**
  Bad example of cohesion - low cohesion
 
  Adding a new employee to the company seems unrelated to the specific tasks of computing paychecks.
 */
public class Payroll {
    public void computeEmployeePay() {
        System.out.println("Compute pay for employees");
    }
    public void computeEmployeeTaxes() {
        System.out.println("Compute taxes for employees");
    }
    public void addNewEmployee(Employee e) {
        System.out.println("New employee hired...");
    }
}
```

```java
/**
  Good example of cohesion - high cohesion
 
  To make Payroll highly cohesive, remove the addNewEmployee method from Payroll and add it to a new class that is related to the tasks of hiring employees. For example, the following HumanResources class seems like a good class to contain such a method.
 */
public class Payroll1 {
    public void computeEmployeePay() {
        System.out.println("Compute pay for employees");
    }
    public void computeEmployeeTaxes() {
        System.out.println("Compute taxes for employees");
    }
}
 
public class HumanResources {
    public void addNewEmployee(Employee e) {
        System.out.println("New employee hired...");
    }
    public void removeEmployee(Employee e) {
        System.out.println("Employee leaving...");
    }
}
```

### Summary
There is a direct relationship and benefit to using tight encapsulation, loose coupling, and high cohesion. Using tight encapsulation and high cohesion tends to result in loose coupling, all of which result in code that is more maintainable and reusable.

