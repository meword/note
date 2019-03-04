// const observer = new PerformanceObserver((list)=>{
//     for(const entry of list.getEntries()){
//         console.log(entry.entryType);
//         console.log(entry.startTime);
//         console.log(entry.duration);
//     }
// });
// observer.observe({entryTypes:["longtask"]});

if ("PerformanceLongTaskTiming" in window) {
    const observer = new PerformanceObserver((list)=>{
        for(const entry of list.getEntries()){
            // const metriName = entry.name;
            console.table(entry);
            console.log(JSON.stringify(entry.attribution));
            console.log(entry.startTime);
            console.log(entry.duration);
        }
    });
    observer.observe({entryTypes:["longtask"]});
}