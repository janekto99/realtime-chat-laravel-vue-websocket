<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Models\Message;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = $request->input('message');
        $chatUserId = $request->input('id');

        $newMessage = Message::query()->create([
            'message' => $message,
            'user_id' => Auth::id(),
            'chat_user_id' => $chatUserId,
        ]);

        broadcast(new MessageEvent($newMessage));
    }

    public function getUserChat(Request $request): Collection|array
    {
        $authId = Auth::id();
        $userId = $request->input('userId');

        return Message::query()
            ->where([
                ['user_id', $authId],
                ['chat_user_id', $userId],
            ])
            ->get();
    }
}
