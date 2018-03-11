package com.google.hacktj2018;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.View;
import android.widget.*;


// public static final String INBOX = "content://sms/inbox";
// public static final String SENT = "content://sms/sent";
// public static final String DRAFT = "content://sms/draft";


public class MainActivity extends AppCompatActivity {

    private Button search;
    private EditText edit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        search = (Button)findViewById(R.id.search);
        edit = (EditText)findViewById(R.id.editText);



        Cursor cursor = getContentResolver().query(Uri.parse("content://sms/inbox"), null, null, null, null);

        if (cursor.moveToFirst()) { // must check the result to prevent exception
            do {
                String msgData = "";
                for(int idx=0;idx<cursor.getColumnCount();idx++)
                {
                    msgData += cursor.getString(idx);
                    Log.e("tim's secrets", msgData);
                }
                // use msgData
            } while (cursor.moveToNext());
        } else {
            // empty box, no SMS
        }

        search.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SmsManager smsManager = SmsManager.getDefault();
                smsManager.sendTextMessage("+15715334077", null, edit.getText().toString(), null, null);
//                Intent m = new Intent(Intent.ACTION_VIEW, Uri.parse("sms:"
//                        + "15715334077"));
//                m.putExtra("sms_body", edit.getText());
//                startActivity(m);
//                Intent i = new Intent(MainActivity.this,ResultActivity.class);
//                startActivity(i);
            }
        });

    }
}
