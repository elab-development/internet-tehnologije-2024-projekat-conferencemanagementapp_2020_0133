<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => RoleMiddleware::class,
            'permission' => PermissionMiddleware::class,
            'role_or_permission' => RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->renderable(function (\Exception $e, Request $request) {



            Log::error($e);


            if ($e instanceof ValidationException) {
                $errors = $e->errors();

                if (isset($errors['email']) && collect($errors['email'])->contains(fn($msg) => str_contains($msg, 'already been taken'))) {
                    return response()->json([
                        'success' => false,
                        'message' => "Already registered email.",
                        'errors' => $errors,
                        'type' => get_class($e),
                    ], 422);
                }

                if (isset($errors['password'])) {
                    // Provera za potvrdu lozinke
                    if (collect($errors['password'])->contains(fn($msg) => str_contains($msg, 'confirmation'))) {
                        return response()->json([
                            'success' => false,
                            'message' => "Passwords do not match.",
                            'errors' => $errors,
                            'type' => get_class($e),
                        ], 422);
                    }
                    // Provera za minimalnu dužinu lozinke
                    if (collect($errors['password'])->contains(fn($msg) => str_contains($msg, 'at least'))) {
                        return response()->json([
                            'success' => false,
                            'message' => "Password is too short.",
                            'errors' => $errors,
                            'type' => get_class($e),
                        ], 422);
                    }
                }

                return response()->json([
                    'success' => false,
                    'message' => "Validation failed!",
                    'errors' => $errors,
                    'type' => get_class($e),
                ], 422);
            }

            if ($e instanceof AuthenticationException || $e instanceof RouteNotFoundException) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated',
                    'type' => get_class($e),
                ], 401);
            }

            if ($e instanceof NotFoundHttpException) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resource not found',
                    'type' => get_class($e),
                ], 404);
            }

            if ($e instanceof MethodNotAllowedHttpException) {
                return response()->json([
                    'success' => false,
                    'message' => 'Method not allowed',
                    'type' => get_class($e),
                ], 405);
            }

            
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'type' => get_class($e),
            ], 500);
        });
    })->create();
