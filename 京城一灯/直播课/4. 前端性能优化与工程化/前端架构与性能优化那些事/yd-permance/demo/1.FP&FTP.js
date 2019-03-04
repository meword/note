console.log(window.performance.getEntriesByType("paint"));
const observer = new PerformanceObserver((list)=>{
    for(const entry of list.getEntries()){
        console.log(entry.name);
        console.log(entry.entryType);
        console.log(entry.startTime);
        console.log(entry.duration);
    }
});
observer.observe({entryTypes:["paint"]});

