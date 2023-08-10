<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = $request->input('message');

        $newMessage = Message::query()->create([
            'message' => $message,
            'user_id' => 1,
        ]);

        broadcast(new MessageEvent($newMessage));
    }
}
