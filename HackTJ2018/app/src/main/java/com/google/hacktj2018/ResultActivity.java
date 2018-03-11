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
        int number = 1;

        Intent i = getIntent();
        String blobText = i.getStringExtra("msg");
        String subj = blobText.substring((blobText.indexOf("SUBJ:") + 5),(blobText.indexOf("MSG:")));
        title.setText(subj);

        if(blobText.charAt(1) == '1') {
            number = Character.getNumericValue(blobText.charAt(6));
        }

        String bodyText = "";
        for(int j = 0; j < number; j++){

            if(j == 0){
                bodyText += blobText.substring(blobText.indexOf("MSG:") + 4, blobText.indexOf("(Con't)"));
            }else if(j == number - 1){
                String endText = (j + 1) + " of " + (number);
                bodyText += blobText.substring(blobText.indexOf(endText) + 6, blobText.indexOf("@n9"));
            }else{
                String endText = (j + 1) + " of " + (number);
                bodyText += blobText.substring(blobText.indexOf(endText) + 6, blobText.indexOf("(Con't)", blobText.indexOf(endText)));
            }
            System.out.print(bodyText);
        }
        bodyText = bodyText.replace("\n", "").replace("\r", "");
        p1.setText(bodyText);

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
