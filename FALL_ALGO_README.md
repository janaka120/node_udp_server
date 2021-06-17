- Total sum of acceleration vector, Acc

    ** Acc = √(𝐴𝑥)2 + (𝐴𝑦)2 + (𝐴𝑧)2 **

Where 𝐴𝑥, 𝐴𝑦, and 𝐴𝑧 are the accelerations (g) in the 𝑥, 𝑦, and 𝑧 directions.


- Angular velocity is calculated from sampled data as indicated in the following:

    ** 𝜔 = √(𝜔𝑥)2 + (𝜔𝑦)2 + (𝜔𝑧)2 **

where 𝜔𝑥, 𝜔𝑦, and 𝜔𝑧 are angular velocities in 𝑥, 𝑦, and 𝑧 directions.


When stationary, the acceleration magnitude, Acc, from triaxial accelerometer is constant(+1g), and angular velocity is 0∘/s.
When the subject falls, the acceleration is rapidly changing and the angular velocity produces a variety of signals along fall direction.


- Critical thresholds in the acceleration and angular velocity are then used for determining a fall event.

1)  Lower fall threshold (LFT):

LPVs - Local minima for the Acc resultant of each recorded activity are referred to as the signal lower peak values (LPVs).
The LFT(acc) for the acceleration signals is set at the level of the smallest magnitude lower fall peak(LFP) recorded.
    
    LPVs = [12.345, 8.655, 12.456, 11.789, 7.258] // signal lower peak values of each activities
    LFT(acc) = smallest magnitude lower fall peak(LFP) recorded (min value of LPVs)

2)  Upper fall threshold(UFT):

UPVs - local maxima for the Acc resultant of each recorded activity are referred to as the signal upper peak values (UPVs).
UFT(acc) - The UFT for each of the acceleration (UFTacc) signals are set at the level of the lowest upper fall peak (UFP) recorded values.

UFT(gyro) - The UFT for each of the angular velocity (UFTgyro) signals are set at the level of the lowest upper fall peak (UFP) recorded values.

** When do the coding for select UFT for acc & gyro, follow these steps **

I - select 3 values of maximum upper peak values for each activity(eg:- walk, running, sitting up and etc) 
        walk => [12.34, 12.52, 12.61], running => [14.34, 14.52, 14.61], sitting up => [8.34, 8.52, 8.61] ; max upper 3 values of each activity

II - Then select one single value form perviously selected maximum upper peak values. (get average value)
        walk => [12.34, 12.52, 12.61] / 3, running => [14.34, 14.52, 14.61] / 3, sitting up => [8.34, 8.52, 8.61] / 3 ; Get average max upper value

III - Next select a maximum value of upper peak value set of each activities.