<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Url;

class UrlController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'url' => 'required|url'
        ]);
        //
        $url = new Url;

        $url->url = $request->input('url');;
        $url->short_url = base_convert(microtime(false), 10, 36);;
        
        $url->save();

        return response()->json([
            'url' => $url->url,
            'short_url' => $url->short_url
        ]);
    }
}
