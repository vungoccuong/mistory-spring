package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        SharedData s = new SharedData();
        int t = 1;
        new Producer(s);
        new Consumer(t);
    }
}
