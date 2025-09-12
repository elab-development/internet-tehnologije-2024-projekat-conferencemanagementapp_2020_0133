<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your E-Ticket</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f9f9f9; color: #333; }
        .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; }
        h1 { color: #2c3e50; }
        .details { margin: 20px 0; }
        .details p { margin: 5px 0; }
        .footer { font-size: 12px; color: #999; margin-top: 20px; }
        .qr { text-align: center; margin: 20px 0; }
        .qr img { width: 150px; height: 150px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thank you for your purchase, {{ $user->first_name }}!</h1>

        <p>You have successfully purchased a ticket for the conference:</p>

        <div class="details">
            <p><strong>Conference:</strong> {{ $ticketType->conference->title }}</p>
            <p><strong>Ticket Type:</strong> {{ $ticketType->name }}</p>
            <p><strong>Payment Method:</strong> {{ $ticket->payment_method }}</p>
        </div>

        <p>Your ticket is at the end of this mail.</p>

        <p>Please present this e-ticket at the event entrance.</p>

        <div class="footer">
            &copy; {{ date('Y') }} Conference Management System
        </div>
    </div>
</body>
</html>
