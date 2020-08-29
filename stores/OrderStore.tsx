import { observable } from "mobx"

class OrderStore {
    constructor(initialData = { date: new Date() }) {
        this.date = initialData.date;
    }

    @observable
    date: Date | undefined;

    setDate(date: Date) {
        this.date = date;
    }
}


export default OrderStore;