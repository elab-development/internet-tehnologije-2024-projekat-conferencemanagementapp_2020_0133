<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>E-Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f8f8;
            margin: 0;
            padding: 0;
        }
        .ticket-container {
            width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            padding: 30px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #333;
            font-size: 28px;
        }
        .user-info, .conference-info {
            margin-bottom: 20px;
        }
        .user-info p, .conference-info p {
            margin: 4px 0;
            color: #555;
        }
        .qr-code {
            text-align: center;
            margin-top: 20px;
        }
        .qr-code img {
            width: 200px;
            height: 200px;
        }
        .footer {
            text-align: center;
            color: #888;
            font-size: 12px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="ticket-container">
        <div class="header">
            <h1>Your E-Ticket</h1>
        </div>

        <div class="user-info">
            <p><strong>Name:</strong> {{ $user->first_name }} {{ $user->last_name }}</p>
            <p><strong>Email:</strong> {{ $user->email }}</p>
        </div>

        <div class="conference-info">
            <p><strong>Conference:</strong> {{ $ticketType->conference->title }}</p>
            <p><strong>Location:</strong> {{ $ticketType->conference->location }}</p>
            <p><strong>Ticket Type:</strong> {{ $ticketType->name }}</p>
        </div>

        <div class="qr-code">
            <img src="{{ $qrBase64 }}" alt="QR Code">

            {{-- <img src="https://quickchart.io/barcode?type=qrcode&text={{ urlencode($qrText) }}" alt="QR Code"> --}}
        </div>

        <div class="footer">
            <p>Thank you for registering for the conference!</p>
        </div>
    </div>
</body>
</html>
