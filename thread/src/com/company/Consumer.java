package com.company;

class Consumer extends Thread {
    SharedData sharedData;
    public Consumer(SharedData sharedData) {
        this.sharedData = sharedData;
        this.start();

    }
    public Consumer(int a) {

    }

    public void run() {
        for (int i = 0; i < 5; i++) {
            sharedData.consume();
        }
    }
}
