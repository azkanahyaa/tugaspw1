<?php 
    $tanggal = $_POST['tanggal'];
    $xtanggal = new DateTime($tanggal);
    $pelanggan = $_POST['pelanggan'];
    $operator = $_POST['operator'];
    $paket = $_POST['paket'];
    $durasi = $_POST['duration'];
    $konsol = $_POST['konsol'];
    $room = $_POST['room_type'];
    $noruangan = $_POST['room'];
    $snack = $_POST['snack'];

    $hsKonsol = [
        "PlayStation 3" => 5000,
        "PlayStation 4" => 8000,
        "PlayStation 5" => 10000,
    ];

    $hsRoom = [
        "Economy (Publik)" => 0,
        "Bisnis" => 7000,
        "VVIP" => 15000,
    ];

    $hSnack = [
        "Mie Goreng" => 5000, 
        "Mie Rebus" => 5000,
        "Kentang Goreng" => 5000,
        "Mendoan" => 2000,
        "Es Jeruk" => 3000,
        "Es Teh" => 3000
    ];
    
    $total;
?> 
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Nexusplay Hasil</title>
    <meta property="og:title" content="Nexusplay Hasil" />

    <style data-tag="reset-style-sheet">
      html {  line-height: 1.15;}body {  margin: 0;}* {  box-sizing: border-box;  border-width: 0;  border-style: solid;}p,li,ul,pre,div,h1,h2,h3,h4,h5,h6 {  margin: 0;  padding: 0;}button {  background-color: transparent;}button,input,optgroup,select,textarea {  font-family: inherit;  font-size: 100%;  line-height: 1.15;  margin: 0;}button,select {  text-transform: none;}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner {  border-style: none;  padding: 0;}button:-moz-focus,[type="button"]:-moz-focus,[type="reset"]:-moz-focus,[type="submit"]:-moz-focus {  outline: 1px dotted ButtonText;}a {  color: inherit;  text-decoration: inherit;}input {  padding: 2px 4px;}img {  display: block;}html { scroll-behavior: smooth  }
    </style>
    <style data-tag="default-style-sheet">
      html {
        font-family: Inter;
        font-size: 16px;
      }

      body {
        font-weight: 400;
        font-style:normal;
        text-decoration: none;
        text-transform: none;
        letter-spacing: normal;
        line-height: 1.15;
        color: var(--dl-color-gray-black);
        background-color: var(--dl-color-gray-white);

      }
    </style>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <div>
      <link href="./css/hasil.css" rel="stylesheet" />

      <div class="hasil-container">

        <div class="hasil-container1">
            <div class="hasil-appbar">
                <h1 class="hasil-heading">NEXUSPLAY CONSOLE</h1>
                <span class="hasil-text">Formulir sewa konsol</span>
            </div>
            <div class="hasil-content">
                <div class="top-label">
                    <a href="." class="backurl">Kembali & isi ulang form</a>
                    <span><?php echo $xtanggal->format('j F Y') ; ?></span>
                </div>
                <div class="overview">
                    <h2>Ruang <?php echo $room ; ?> No. <?php echo $noruangan ; ?> </h2>
                    <p><?php echo $konsol ; ?> | <?php echo $durasi ; ?> Jam</p>
                </div>

                <table>
                    <tr>
                        <td>Nama Pelanggan</td>
                        <td>:</td>
                        <td><?php echo $pelanggan ; ?> </td>
                    </tr>
                    <tr>
                        <td>Nama Operator</td>
                        <td>:</td>
                        <td><?php echo $operator ; ?> </td>
                    </tr>
                    <tr>
                        <td>Pilihan Paket</td>
                        <td>:</td>
                        <td><?php echo $paket ; ?> </td>
                    </tr>
                    <tr>
                        <td>Pilihan Makanan</td>
                        <td>:</td>
                        <td><?php echo $snack ; ?> </td>
                    </tr>
                </table>

                <div class="harga">
                    <h4>Biaya yang Dikeluarkan</h4>
                        <table>
                        <tr>
                            <td><?php echo $konsol ; ?>  / Jam</td>
                            <td>+</td>
                            <td>Rp<?php echo $hsKonsol[$konsol] ; ?></td>
                        </tr>
                        <tr>
                            <td>Ruang <?php echo $room ; ?>  / Jam</td>
                            <td>+</td>
                            <td>Rp<?php echo $hsRoom[$room] ; ?></td>
                        </tr>
                        <tr>
                            <td>---------------------</td>
                        </tr>
                        <?php $total = $hsKonsol[$konsol] + $hsRoom[$room] ; ?> 
                        <tr>
                            <td><strong><?php echo $total ; ?> x <?php echo $durasi ; ?> </strong> Jam</td>
                            <?php $total *= (int) $durasi ; ?> 
                            <td>=</td>
                            <td>Rp<?php echo $total ; ?> </td>
                        </tr>
                        <?php foreach(explode(',',$snack) as $s) : ?>
                            <tr>
                                <td><?php echo $s ; ?></td>
                                <td>+</td>
                                <td>Rp<?php echo $hSnack[$s] ; ?> </td>
                                <?php $total += $hSnack[$s] ; ?> 
                            </tr>
                        <?php endforeach ; ?> 

                        <?php 
                            $diskon;

                            if ($paket == 'Paket Irit') {
                                $diskon = 15; // persen
                            } elseif ($paket == 'Paket Sultan') {
                                $diskon = 30; //persen
                            }

                            $potongan = $total * $diskon / 100;
                            $total -= $potongan;
                        ?> 
                        <tr>
                            <td>Diskon Paket</td>
                            <td>-</td>
                            <td><?php echo $diskon ; ?>% (Rp<?php echo $potongan ; ?>)</td>
                        </tr>
                    </table>
                    <h2>Total: Rp<?php echo $total ; ?> </h2>    
                </div>
            </div>
            
        </div>

      </div>
    </div>
    <script src="./home.js" type="module"></script>
  </body>
</html>
