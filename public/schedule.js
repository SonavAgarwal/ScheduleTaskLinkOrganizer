var oldScheduleData =
    '[{"times":[{"day":"Monday","periods":[{"1":"9:30","3":"11:00","5":"13:05","7":"14:30"}],"periodLength":"1:15"},{"day":"Tuesday","periods":[{"2":"9:30","4":"11:00","6":"13:05"}],"periodLength":"1:15"},{"day":"Wednesday","periods":[{"1":"9:30","2":"10:10","3":"10:50","4":"11:30","5":"13:00","6":"13:40","7":"14:20"}],"periodLength":"0:30"},{"day":"Thursday","periods":[{"1":"9:30","3":"11:00","5":"13:05","7":"14:30"}],"periodLength":"1:15"},{"day":"Friday","periods":[{"2":"9:30","4":"11:00","6":"13:05"}],"periodLength":"1:15"}]}]';
var normalScheduleData = JSON.stringify([
    {
        times: [
            {
                day: "Monday",
                periods: [{ 1: "9:15", 3: "10:50", 5: "12:50", 7: "14:25" }],
                periodLength: "1:15",
            },
            {
                day: "Tuesday",
                periods: [{ 2: "9:15", 4: "10:50", 6: "12:50" }],
                periodLength: "1:15",
            },
            {
                day: "Wednesday",
                periods: [
                    {
                        1: "9:30",
                        2: "10:10",
                        3: "10:50",
                        4: "11:30",
                        5: "13:00",
                        6: "13:40",
                        7: "14:20",
                    },
                ],
                periodLength: "0:30",
            },
            {
                day: "Thursday",
                periods: [{ 1: "9:15", 3: "10:50", 5: "12:50", 7: "14:25" }],
                periodLength: "1:15",
            },
            {
                day: "Friday",
                periods: [{ 2: "9:15", 4: "10:50", 6: "12:50" }],
                periodLength: "1:15",
            },
        ],
    },
]);
var labor =
    '[{"times":[{"day":"Monday"},{"day":"Tuesday","periods":[{"1":"9:30","3":"11:00","5":"13:05","7":"14:30"}],"periodLength":"1:15"},{"day":"Wednesday","periods":[{"2":"9:30","4":"11:00","6":"13:05"}],"periodLength":"1:15"},{"day":"Thursday","periods":[{"1":"9:30","3":"11:00","5":"13:05","7":"14:30"}],"periodLength":"1:15"},{"day":"Friday","periods":[{"2":"9:30","4":"11:00","6":"13:05"}],"periodLength":"1:15"}]}]';
var finals =
    '[{"times":[{"day":"Monday"},{"day":"Tuesday","periods":[{"3":"9:30","5":"1:05"}],"periodLength":"1:45"},{"day":"Wednesday","periods":[{"2":"9:30","7":"1:05"}],"periodLength":"1:45"},{"day":"Thursday","periods":[{"1":"9:30","4":"1:05"}],"periodLength":"1:45"},{"day":"Friday","periods":[{"6":"9:30"}],"periodLength":"1:45"}]}]';
