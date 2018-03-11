package com.google.hacktj2018;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.telephony.SmsMessage;
import android.util.Log;
import android.view.View;
import android.widget.*;

import java.util.ArrayList;


public class MainActivity extends AppCompatActivity {

    private Button search;
    private EditText edit;
    private static Context mContext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        search = (Button)findViewById(R.id.search);
        edit = (EditText)findViewById(R.id.editText);
        mContext = this;



        search.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SmsManager smsManager = SmsManager.getDefault();
                smsManager.sendTextMessage("+15713029180", null, edit.getText().toString(), null, null);
                Intent m = new Intent(Intent.ACTION_VIEW, Uri.parse("sms:"
                        + "15713029180"));
            }
        });

    }
    static public class IncomingSms extends BroadcastReceiver {

        // Get the object of SmsManager
        final SmsManager sms = SmsManager.getDefault();
        public String text = "";

        public void onReceive(Context context, Intent intent) {

            // Retrieves a map of extended data from the intent.
            final Bundle bundle = intent.getExtras();

            try {
                if (bundle != null) {
                    final Object[] pdusObj = (Object[]) bundle.get("pdus");

                    for (int i = 0; i < pdusObj.length; i++) {

                        SmsMessage currentMessage = SmsMessage.createFromPdu((byte[]) pdusObj[i]);
                        String phoneNumber = currentMessage.getDisplayOriginatingAddress();

                        String senderNum = phoneNumber;
                        text += currentMessage.getDisplayMessageBody();


                    } // end for loop

                    ArrayList<String> mes = new ArrayList<String>();
                    for (String word : text.split(" ")) {
                        if(word.equals("SUBJ:")){

                        }
                    }

                    Log.i("SmsReceiver", text);

                    Intent r = new Intent(mContext, ResultActivity.class);
                    r.putExtra("msg", text);
                    mContext.startActivity(r);
                } // bundle is null
            } catch (Exception e) {
                Log.e("SmsReceiver", "Exception smsReceiver" + e);

            }
        }
    }
}
