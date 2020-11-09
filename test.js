const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: "iot",
    password: 'root',
    port: 5432,
});
client.connect();
client.query(`
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
    order by time desc
    limit 1;
`, (err, res) => {
    if (err) {
        console.log(err.stack);
    }
    else {
        console.log(res.rows[res.rows.length-1]);
    }
    client.end();
});

//extract(second from time - (data ->> 'time')) as ts_diff