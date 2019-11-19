<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Url;

class ShowUrl extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id)
    {
        $url = Url::where('short_url', '=', $id)->firstOrFail();
        return redirect($url->url, 301);
    }
}
