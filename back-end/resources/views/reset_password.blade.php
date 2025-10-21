<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<p>Hello,</p>

<p>Click the link below to reset your password:</p>

<a href="{{ $url }}">{{ $url }}</a>

<p>If you did not request a password reset, no further action is required.</p>
</html>