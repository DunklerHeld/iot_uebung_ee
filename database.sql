create database iot;
create table mqtt_data (
    time timestamp primary key,
    data json not null
);



select 
    time as ts_in, 
    data ->> 'time' as ts_meas,
    data ->> 'id' as id,
    data ->> 'temp' as temp,
    data ->> 'battery' as battery,
    data ->> 'memTotal' as memtotal,
    data ->> 'memAvailable' as memavailable,
    data ->> 'load' as load,
    (time - ((data ->> 'time')::timestamp)) as ts_diff,
    avg(cast(data ->> 'temp' as double precision))
        over(order by time rows between 3 preceding and 3 following) AS avg_temp
from mqtt_data 
order by time desc;