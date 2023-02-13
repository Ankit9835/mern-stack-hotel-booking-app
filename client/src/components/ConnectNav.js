import { useSelector } from "react-redux";
import { Card, Avatar,  Badge } from "antd";
import moment from "moment";
import { getAccountBalance, currencyFormatter, payoutSetting } from "../actions/stripe";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SettingOutlined } from "@ant-design/icons";


const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {

    const {user} = useSelector((store) => store.auth)
    const [balance,setBalance] = useState(0)
    const [loading,setLoading] = useState(false)

    const updatedBalance = async () => {
      try{
        const res = await getAccountBalance(user.token)
        if(res){
          console.log('Updated balance response', res)
          setBalance(res.data)
        }
      } catch(error){
        console.log(error)
      }
    }

    const handlePayoutSettings = async () => {
      setLoading(true);
      try {
        const res = await payoutSetting(user.token);
        console.log("RES FOR PAYOUT SETTING LINK", res);
        // window.location.href = res.data
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast("Unable to access settings. Try again");
      }
    };

    useEffect(()=>{
      updatedBalance()
    },[]) 

    return (
      <div className="d-flex justify-content-around">
        <Card>
          <Meta
            avatar={<Avatar>{user.user.name[0]}</Avatar>}
            title={user.user.name}
            description={`Joined ${moment(user.user.createdAt).fromNow()}`}
          />
        </Card>
        {user &&
        user.user &&
        user.user.stripe_seller &&
        user.user.stripe_seller.charges_enabled && (
          <>
           <Ribbon text="Avaliable" color="grey">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                     &#8377; {bp.amount / 100}
                    </span>
                  ))}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="silver">
              <Card onClick={handlePayoutSettings} className="bg-light pointer">
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
      </div>
    );
}

export default ConnectNav
