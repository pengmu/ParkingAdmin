/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

Office.onReady(info => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
	
  }
});

export async function run() {
	
	var bookingDate = $('#datepicker').val();
	console.log("book parking on "+bookingDate);
	createMailMessage(bookingDate);
	
}

function createMailMessage(bookingDate) {
	var name = Office.context.mailbox.userProfile.displayName
	Office.context.mailbox.displayNewMessageForm(
  {
    // Copy the To line from current item.
    toRecipients: ['administration.parking@syngenta.com'],
    subject: 'Book parking space on '+bookingDate,
    htmlBody: 'Hi,<br/>&nbsp I plan to come to Basel on <b>'+bookingDate+'</b>. Please activate my badge for the underground parking.<br/><br/>Many Thanks,<br/>'+name
  });


}



