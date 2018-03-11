package com.google.hacktj2018;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.telephony.SmsMessage;
import android.util.Log;
import android.widget.*;

public class ResultActivity extends AppCompatActivity {

    TextView title;
    TextView p1;
    TextView p2;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        title = (TextView) findViewById(R.id.title);
        p1 = (TextView) findViewById(R.id.p1);
        p2 = (TextView) findViewById(R.id.p2);


        title.setText(getIntent().getStringExtra("msg"));


//        Cursor cursor = getContentResolver().query(Uri.parse("content://sms/inbox"), null, null, null, null);
//
//        if (cursor.moveToFirst()) { // must check the result to prevent exception
//            do {
//                String msgData = "";
//                for(int idx=0;idx<cursor.getColumnCount();idx++)
//                {
//                    msgData += cursor.getString(idx);
//                    title.setText(msgData);
//                    Log.e("tim's secrets", msgData);
//                }
//                // use msgData
//            } while (cursor.moveToNext());
//        } else {
//            // empty box, no SMS
//        }

    }


}
