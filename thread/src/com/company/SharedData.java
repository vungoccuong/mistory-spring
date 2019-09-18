package com.company;

class SharedData {
    int data;

    public synchronized void produce(int value) {

        data = value; //
        System.out.println("produce: " + value);
    }

    public synchronized void consume() {
        System.out.println("consume: " + data);
    }
}
