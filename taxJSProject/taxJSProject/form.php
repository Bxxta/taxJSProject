
<?php
 function getForm ()
 {
 echo "<form name='exampleForm'>";
 echo '<fieldset>';
 echo 'Podaj swoja stawke na godzine';
 echo'<br>';
 echo "<label>Zl:<input id='salaryHourZl' type='text'/></label><label>Gr:<input id='salaryHourGr' type='text'/></label>";
 echo '<br>';
 echo 'Rodzaj umowy:';
 echo "<label><input id='employeeContract' name='contract' type='radio' value='isEmploymentContract'></input>Umowa o pracę: </label>
	   <label> <input type='radio' name='contract' id='orderContract' value='isOrderContract'></input>Umowa zlecenie:</label>";
 echo "<br>";
 echo "<label id='labelforState' class= 'hidden'> <input type='radio' name='state' value='trueStudentState'> Posiadam status Studenta/Ucznia </input><input type = 'radio' name= 'state' value= 'falseStudentState'>Nie posiadam status Ucznia/Studenta</input><br></label>";
 echo "<label id='labelforHour'>Godziny : <input type='text' id='hours'></input></label>";
 echo "<label id='labelforDay' class='hidden'>Godziny dzienne: <input type='text' id='dayHour'></input></label>";
 echo "<label id='labelforNight' class='hidden'>Godziny nocne: <input type='text' id='nightHour'></input></label>";
 echo '</form">';
 echo "<input type='button'  id='send'> Oblicz </input";
 echo '</fieldset>';
 }
?>

