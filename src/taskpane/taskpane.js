/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */


function force_init(){
  log("status_console",'force office to init!');
  $(document).ready(function () {

    //log("jquery_console","setting triggers");
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
	

  });
}
Office.initialize = function (reason) {
  //log("init_console","initialized "+reason)
};
Office.onReady(info => {
  //log("status_console",'office load ready');
  $(document).ready(function () {
    if (info.host === Office.HostType.Outlook) {
     // log("jquery_console","setting triggers");
      document.getElementById("app-body").style.display = "flex";
      document.getElementById("run").onclick = run;
	
    }
  });
});

export async function run() {
	
	var bookingDate = $('#datepicker').val();
  console.log("book parking on "+bookingDate);
  //log("msg_console","book parking on "+bookingDate);
	createMailMessage(bookingDate);
	
}

function createMailMessage(bookingDate) {
  var name = Office.context.mailbox.userProfile.displayName
  //log("msg_console","booking for "+name);
	Office.context.mailbox.displayNewMessageForm(
  {
    // Copy the To line from current item.
    toRecipients: ['administration.parking@syngenta.com'],
    subject: 'Book parking space on '+bookingDate,
    htmlBody: 'Hi,<br/>&nbsp I plan to come to Basel on <b>'+bookingDate+'</b>. Please activate my badge for the underground parking.<br/><br/>Many Thanks,<br/>'+name
  });

}

function log(console_id,msg) {
  $("#"+console_id).text(msg)
}

/*
try {
  if (!window.external.GetContext) {
      console.log('Not in office context');
      force_init();
  }
} catch (e) {
  // when in office context unable to access external.
}
*/



